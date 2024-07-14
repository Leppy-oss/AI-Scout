import { JSONLoader } from 'langchain/document_loaders/fs/json';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { ChatGroq } from '@langchain/groq';
import { pull } from 'langchain/hub';
import {
    RunnablePassthrough,
    RunnableSequence,
} from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { Document } from '@langchain/core/documents';

const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HF_API_KEY,
    model: 'BAAI/bge-small-en-v1.5'
});
const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
});

const formatDocumentsAsString = docs => docs.map((doc) => doc.pageContent).join("\n\n");

export default async function handler(req, res) {
    if (req.method == 'GET') {
        try {
            const matches = await (await fetch(process.env.FTC_SCOUT_URL)).json();
            const teamData = {};
            matches.forEach(match => {
                if (match.hasBeenPlayed) {
                    match.teams.map(team => {
                        const teamNumber = team.teamNumber;
                        if (!teamData.hasOwnProperty(teamNumber)) teamData[teamNumber] = { matches: [] };
                        teamData[teamNumber].matches.push(match.scores[team.alliance.toLowerCase()]);
                    })
                }
            });
            const teamDataArray = [];
            for (const team in teamData) teamDataArray.push({
                teamNumber: team,
                ...teamData[team]
            });
            try {
                const docs = teamDataArray.map(team => new Document({
                    pageContent: JSON.stringify(team)
                }));
                console.log(docs);
                const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
                const retriever = vectorStore.asRetriever();
                const prompt = await pull('rlm/rag-prompt');

                const chain = RunnableSequence.from([
                    {
                        context: retriever.pipe(formatDocumentsAsString),
                        question: new RunnablePassthrough(),
                    },
                    prompt,
                    llm,
                    new StringOutputParser(),
                ]);

                const response = await chain.invoke('Summarize the performance of team 5470');

                res.send({ response });
            } catch (e) {
                res.status(500).send({ error: `An error occurred while trying to process the query: ${e}` })
            }
        } catch (e) { res.status(500).send({ error: `Error fetching match data from FTCScout: ${e}` }); }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export const runtime = 'nodejs';