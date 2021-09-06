import { CircularProgress } from "@material-ui/core"

const Loading = () => {
    return (
    <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress />
    </div>
    )
}

export default Loading