import { DividerVariables } from '../../../teams/components/Divider/dividerVariables'
import { Partial } from 'types/utils'

export default (siteVars: any): Partial<DividerVariables> => ({
  colors: {
    primary: siteVars.white,
  },
  dividerColor: siteVars.white,
  textColor: siteVars.white,
})
