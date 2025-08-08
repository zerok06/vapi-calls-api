interface CustomFieldValue {
    value: boolean | string | number; // Defaults to true
}

interface CustomField {
    field_id: number; // Defaults to 0
    field_name: string;
    field_code: string;
    field_type: string;
    values: CustomFieldValue[];
    is_computed: boolean; // Defaults to true
}

interface Tag {
    id: number; // Defaults to 0
    name: string;
    color: string;
}

interface Company {
    // Estructura no definida, ajustar según datos reales
    [key: string]: any;
}

interface Links {
    self: {
        href: string;
    };
}

interface Embedded {
    tags: Tag[];
    companies: Company[];
}

export interface Lead {
    id: number; // Defaults to 0
    name: string;
    price: number; // Defaults to 0
    responsible_user_id: number; // Defaults to 0
    group_id: number; // Defaults to 0
    status_id: number; // Defaults to 0
    pipeline_id: number; // Defaults to 0
    loss_reason_id: string;
    created_by: number; // Defaults to 0
    updated_by: number; // Defaults to 0
    created_at: number; // Defaults to 0
    updated_at: number; // Defaults to 0
    closed_at: string;
    closest_task_at: string;
    is_deleted: boolean; // Defaults to true
    custom_fields_values: CustomField[];
    score: string;
    account_id: number; // Defaults to 0
    labor_cost: string;
    is_price_computed: boolean; // Defaults to true
    _links: Links;
    _embedded: Embedded;
}


export interface CreateNote {
    entity_id: number;
    note_type?: string;
    params?: {
        text: string;
    }
}