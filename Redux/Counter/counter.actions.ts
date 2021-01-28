export default function mapDispatchToProps(dispatch: any) {
    return {
      increaseCounter: () => dispatch({type:'INCREASE_COUNTER'}),
      decreaseCounter: () => dispatch({type:'DECREASE_COUNTER'})
    }
}