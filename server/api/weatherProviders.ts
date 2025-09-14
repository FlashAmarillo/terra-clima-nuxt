
import { availableProviders } from '~/server/services/weatherProviders/availableProviders'

export default defineEventHandler(() => {
  return availableProviders
})