export interface ProperyOwnerDTO {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  nationality?: string;
  assignedToId?: number;
  assignedToName?: string;
  mainLeadSource?: string;
  ssn?: string;
}

export type CreatePropertyOwnerDTO = Omit<
  ProperyOwnerDTO,
  "id" | "assignedToName"
>;
