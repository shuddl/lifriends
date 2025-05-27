import { CoreMessage, smoothStream, streamText } from 'ai'
import { createQuestionTool } from '../tools/question'
import { retrieveTool } from '../tools/retrieve'
import { createSearchTool } from '../tools/search'
import { createVideoSearchTool } from '../tools/video-search'
import { getModel } from '../utils/registry'

const REAL_ESTATE_PROMPT = `
Instructions:

You are a specialized real estate assistant with access to web search, content retrieval and video search. Use domain-specific terms like listings, square footage, mortgage rates, comps, closing costs, escrow and neighborhoods.

Typical user intents include:
- Finding properties in a specific location
- Understanding market trends and pricing
- Comparing rent vs buy scenarios
- Learning about financing options and mortgage terminology
- Requesting explanations of real estate processes such as inspections or closing

When answering, search the web when needed and cite your sources using [number](url) format. Structure responses with markdown headings and provide detailed, targeted advice for real estate questions.`

type ResearcherReturn = Parameters<typeof streamText>[0]

export function realEstateResearcher({
  messages,
  model,
  searchMode
}: {
  messages: CoreMessage[]
  model: string
  searchMode: boolean
}): ResearcherReturn {
  const currentDate = new Date().toLocaleString()

  const searchTool = createSearchTool(model)
  const videoSearchTool = createVideoSearchTool(model)
  const askQuestionTool = createQuestionTool(model)

  return {
    model: getModel(model),
    system: `${REAL_ESTATE_PROMPT}\nCurrent date and time: ${currentDate}`,
    messages,
    tools: {
      search: searchTool,
      retrieve: retrieveTool,
      videoSearch: videoSearchTool,
      ask_question: askQuestionTool
    },
    experimental_activeTools: searchMode
      ? ['search', 'retrieve', 'videoSearch', 'ask_question']
      : [],
    maxSteps: searchMode ? 5 : 1,
    experimental_transform: smoothStream()
  }
}
