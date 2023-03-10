import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { goBack } from '../../modules/routing/actions'
import AssetPage from './AssetPage'
import { MapDispatchProps } from './AssetPage.types'

const mapState = () => ({})

const mapDispatch = (dispatch: Dispatch): MapDispatchProps => ({
  onBack: (location?: string) => dispatch(goBack(location))
})

export default connect(mapState, mapDispatch)(AssetPage)
