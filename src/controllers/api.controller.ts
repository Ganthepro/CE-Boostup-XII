import { LoginDto, RegisterDto, ResetPasswordDto, RequestPasswordResetDto } from "../dto/auth.dto";
import { CreateProblemDto, UpdateProblemDto } from "../dto/problem.dto";
import { UpdateProblemTagDto, CreateProblemTagDto } from "../dto/problem-tags.dto";
import { CreateSaveDto, UpdateSaveDto } from "../dto/saves.dto";
import { CreateGroupDto, UpdateGroupDto } from "../dto/groups.dto";
import { CreateUserDto, UpdateUserDto } from "../dto/users.dto";
import { PaginationRequestDto } from "../dto/utils.dto";
import { CreateAttachmentDto } from "../dto/attachments.dto";
import { ErrorModelResponse } from "../types/response.type";

import axiosInstance from "../services/api.service";

export async function apiController<T>(
  url: string,
  method: "get" | "post" | "put" | "patch" | "delete",
  data?: LoginDto | RegisterDto | ResetPasswordDto | RequestPasswordResetDto
    | UpdateProblemTagDto | CreateProblemTagDto | CreateProblemDto | UpdateProblemDto
    | CreateSaveDto | UpdateSaveDto | CreateGroupDto | UpdateGroupDto | CreateUserDto
    | UpdateUserDto | CreateAttachmentDto,
  params?: PaginationRequestDto
): Promise<T> {
  try {
    const response = await axiosInstance.request({ url, method, data, params });
    return response.data;
  } catch (error) {
    const err: ErrorModelResponse = {
      message: (error as any).response?.data.message,
      statusCode: (error as any).response?.status,
      error: (error as any).response?.data.error
    }
    return Promise.reject(err);
  }
}