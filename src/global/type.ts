export type StudentFormData = {
    first_name: string;
    last_name: string;
    age: string;
    email: string;
    phone: string;
    address: string;
    courseTitle: string;
    coursePrice: number;
    valid_id: File | null;
    selfie: File | null;
};



export type Invoice = {
    id: string;
    courseTitle: string;
    coursePrice: number;
    createdAt: Date;
    updatedAt: Date;
    reference_id: string;
    ammountPaid: number;
    status: string
    dueDate: Date | null;
    paidAt: Date | null;
    studentId: string;
    payment_channel: string | null
};

export type StudentWithInvoices = {
    invoices: Invoice[];
    id: string;
    first_name: string;
    last_name: string;
    age: number;
    email: string;
    phone: string;
    address: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    valid_id_URL: string;
    selfie_URL: string;

};