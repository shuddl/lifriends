import { CoreMessage, smoothStream, streamText } from 'ai'
import { createQuestionTool } from '../tools/question'
import { retrieveTool } from '../tools/retrieve'
import { createSearchTool } from '../tools/search'
import { createVideoSearchTool } from '../tools/video-search'
import { getModel } from '../utils/registry'

const REAL_ESTATE_PROMPT = `
You are a helpful real estate assistant with access to web search, content retrieval and video search tools.
Focus on providing information about property details, valuations, market trends and home buying advice.
Keep responses concise and cite sources using the [number](url) format.
`

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
