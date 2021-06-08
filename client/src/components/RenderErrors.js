import '../css/RenderErrors.css'

const RenderErrors = ({ errors }) => {

    const renderErrors = () => {
        return (
            <div id="errors" className="validation">
                {errors.map(renderError)}
            </div>
        )
    }

    const renderError = error => {
        return (
            <div key={error}>{error}</div>
        )
    }

    return <div>{errors.length > 0 ? renderErrors() : ''}</div>
}

export default RenderErrors
