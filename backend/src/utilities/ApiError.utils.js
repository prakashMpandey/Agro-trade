class ApiError extends Error{

    constructor(statusCode,message="kuch to gadbad hai",errors=[],stack="")
    {

        super()
        this.status=statusCode,
        this.data=null,
        this.message=message,
        this.success=false,
        this.errors=errors


        if(stack)
        {
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default ApiError;