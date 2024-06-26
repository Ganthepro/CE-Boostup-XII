import { apiController } from "../controllers/api.controller"
import { CreateAttachmentDto } from "../dto/attachments.dto"
import { AttachmentModelResponse } from "../types/response.type"
import { PaginationModelResponse } from "../types/response.type"
import { PaginationRequestDto } from "../dto/utils.dto"

export const attachmentsService = {
    async getAttachments(paginationRequest: PaginationRequestDto): Promise<PaginationModelResponse<AttachmentModelResponse>> {
        return await apiController("/attachments", "get", undefined, paginationRequest)
    },
    async getAttachment(id: string): Promise<AttachmentModelResponse> {
        return await apiController(`/attachments/${id}`, "get")
    },
    async createAttachment(createAttachmentRequest: CreateAttachmentDto): Promise<AttachmentModelResponse> {
        return await apiController("/attachments", "post", createAttachmentRequest)
    },
    async deleteAttachment(id: string): Promise<void> {
        return await apiController(`/attachments/${id}`, "delete")
    },
    async getAttachmentByName(id: string, name: string): Promise<AttachmentModelResponse> {
        return await apiController(`/attachments/${id}/${name}`, "get")
    }
}