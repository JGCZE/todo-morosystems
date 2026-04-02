import { enhancedApi as generatedApi } from "./generatedApi";

const enhancedApi = generatedApi.enhanceEndpoints({
  endpoints: {
    getTasks: {
      providesTags: ["Task"],
    },
    postTasks: {
      invalidatesTags: ["Task"],
    },
    deleteTasksById: {
      invalidatesTags: ["Task"],
    },
    postTasksByIdComplete: {
      invalidatesTags: ["Task"],
    },
    postTasksByIdIncomplete: {
      invalidatesTags: ["Task"],
    },
  },
});

export const {
  useGetTasksQuery,
  usePostTasksMutation,
  useDeleteTasksByIdMutation,
  usePostTasksByIdCompleteMutation,
  usePostTasksByIdIncompleteMutation,
} = enhancedApi;
