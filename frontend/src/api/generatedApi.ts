import { api } from "./createApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksApiResponse, GetTasksApiArg>({
      query: () => ({ url: `/tasks` }),
    }),
    postTasks: build.mutation<PostTasksApiResponse, PostTasksApiArg>({
      query: (queryArg) => ({
        url: `/tasks`,
        method: "POST",
        body: queryArg.createTask,
      }),
    }),
    getTasksCompleted: build.query<
      GetTasksCompletedApiResponse,
      GetTasksCompletedApiArg
    >({
      query: () => ({ url: `/tasks/completed` }),
    }),
    postTasksById: build.mutation<
      PostTasksByIdApiResponse,
      PostTasksByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tasks/${queryArg.id}`,
        method: "POST",
        body: queryArg.updateTask,
      }),
    }),
    deleteTasksById: build.mutation<
      DeleteTasksByIdApiResponse,
      DeleteTasksByIdApiArg
    >({
      query: (queryArg) => ({ url: `/tasks/${queryArg.id}`, method: "DELETE" }),
    }),
    postTasksByIdComplete: build.mutation<
      PostTasksByIdCompleteApiResponse,
      PostTasksByIdCompleteApiArg
    >({
      query: (queryArg) => ({
        url: `/tasks/${queryArg.id}/complete`,
        method: "POST",
      }),
    }),
    postTasksByIdIncomplete: build.mutation<
      PostTasksByIdIncompleteApiResponse,
      PostTasksByIdIncompleteApiArg
    >({
      query: (queryArg) => ({
        url: `/tasks/${queryArg.id}/incomplete`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetTasksApiResponse = /** status 200 Successful response */ Task[];
export type GetTasksApiArg = void;
export type PostTasksApiResponse = /** status 200 Successful response */ Task;
export type PostTasksApiArg = {
  /** text */
  createTask: CreateTask;
};
export type GetTasksCompletedApiResponse =
  /** status 200 Successful response */ Task[];
export type GetTasksCompletedApiArg = void;
export type PostTasksByIdApiResponse =
  /** status 200 Successful response */ Task;
export type PostTasksByIdApiArg = {
  /** ID of task */
  id: string;
  /** text */
  updateTask: UpdateTask;
};
export type DeleteTasksByIdApiResponse =
  /** status 200 Successful response */ string;
export type DeleteTasksByIdApiArg = {
  /** ID of task */
  id: string;
};
export type PostTasksByIdCompleteApiResponse =
  /** status 200 Successful response */ Task;
export type PostTasksByIdCompleteApiArg = {
  /** ID of task */
  id: string;
};
export type PostTasksByIdIncompleteApiResponse =
  /** status 200 Successful response */ Task;
export type PostTasksByIdIncompleteApiArg = {
  /** ID of task */
  id: string;
};
export type Task = {
  /** Identification */
  id: string;
  /** Content */
  text: string;
  /** Status */
  completed: boolean;
  /** Date when task was created (Timestamp) */
  createdDate: number;
  /** Date when task was completed (Timestamp) */
  completedDate?: number;
};
export type CreateTask = {
  /** Content */
  text: string;
};
export type UpdateTask = {
  /** Content */
  text: string;
};
export const {
  useGetTasksQuery,
  usePostTasksMutation,
  useGetTasksCompletedQuery,
  usePostTasksByIdMutation,
  useDeleteTasksByIdMutation,
  usePostTasksByIdCompleteMutation,
  usePostTasksByIdIncompleteMutation,
} = injectedRtkApi;
