export class AppError extends Error {
	status: number;

	constructor(message:String, status:number){
		super(message);
		this.status = status;
	}
}