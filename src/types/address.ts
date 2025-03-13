export interface AddressAttributes {
    first_name: string;
    last_name: string;
    street: string;
    city: string;
    county: string;
    postal_code: string;
    country: string;
    phone: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface AddressResource {
    id: string;
    type: 'address';
    attributes: AddressAttributes;
  }
  
  export interface AddressListResponse {
    data: AddressResource[];
  }
  
  export interface AddressRequest {
    address: {
      first_name: string;
      last_name: string;
      street: string;
      city: string;
      county: string;
      postal_code: string;
      country: string;
      phone: string;
    };
  }