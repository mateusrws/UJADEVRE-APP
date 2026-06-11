
interface paymentSchema {
    amount: number;
    status: PaymentStatus;
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
}