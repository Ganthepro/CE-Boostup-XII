import { CompletionStatus } from "../enum/problem.enum";
import { PublicationStatus } from "../enum/problem.enum";
import { Role } from "../enum/roles.enum";

export type PaginationRequestDto = {
    page?: number;
    perPage?: number;
    sort?: string;
    search?: string;
    tags?: string;
    difficulties?: string;
    owner?: string;
    problem?: string;
    completionStatus?: CompletionStatus;
    publicationStatus?: PublicationStatus;
    roles?: Role;
}