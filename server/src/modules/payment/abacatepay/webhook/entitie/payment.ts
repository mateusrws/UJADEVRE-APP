
interface paymentSchema {
    amount: number;
    status: PaymentStatus;
    reg_id: string;
    user_id: string
    createdAt?: Date;
    updatedAt?: Date;
}

export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED"
}

export class Payment {
    private props: paymentSchema;
    private _id: string;

    constructor(props: paymentSchema, id: string){
        this.props = props;
        this._id = id;
        this.props.createdAt = props.createdAt || new Date();
        this.props.updatedAt = props.updatedAt || new Date();
    }

    get get_id(): string{
        return this._id;
    }
    get get_amount(): number{
        return this.props.amount;
    }
    set set_amount(amount: number){
        this.props.amount = amount;
        this.props.updatedAt = new Date();
    }
    get get_status(): string{
        return this.props.status;
    }
    set set_status(status: PaymentStatus){
        this.props.status = status;
        this.props.updatedAt = new Date();
    }
    get get_createdAt(): Date{
        return this.props.createdAt!;
    }
    get get_updatedAt(): Date{
        return this.props.updatedAt!;
    }
    get get_reg_id(): string{
        return this.props.reg_id;
    }
    set set_reg_id(reg_id: string){
        this.props.reg_id=reg_id;
    }
    get get_user_id(): string{
        return this.props.user_id;
    }
    set set_user_id(user_id: string){
        this.props.user_id=user_id;
    }
}