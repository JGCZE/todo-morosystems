import { nanoid } from "@reduxjs/toolkit";
import { enhancedApi as generatedApi } from "./generatedApi";

const enhancedApi = generatedApi.enhanceEndpoints({
  endpoints: {
    deleteTasksById: {
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const optimisticDelete = dispatch(
          generatedApi.util.updateQueryData("getTasks", undefined, (draft) => {
            return draft.filter((task) => task.id !== id);
          })
        );

        try {
          await queryFulfilled
        } catch {
          optimisticDelete.undo()
        }
      }
    },
    getTasks: {
      providesTags: ["Task"],
    },
    postTasks: {
      onQueryStarted: async (task, { dispatch, queryFulfilled }) => {
        const tempId = nanoid();

        const optimisticPost = dispatch(
          generatedApi.util.updateQueryData("getTasks", undefined, (draft) => {
            draft.push({
              completed: false,
              createdDate: Date.now(),
              id: tempId,
              text: task.createTask.text,
            });
          })
        );

        try {
          const { data: created } = await queryFulfilled;

          dispatch(
            generatedApi.util.updateQueryData("getTasks", undefined, (draft) => {
              const index = draft.findIndex((t) => t.id === tempId);
              if (index !== -1) draft[index] = created;
            })
          );
        } catch {
          optimisticPost.undo();
        }
      },
    },
    postTasksByIdComplete: {
      // invalidatesTags: ["Task"],
      onQueryStarted: async (task, { dispatch, queryFulfilled }) => {
        const optimisticUpdate = dispatch(
          generatedApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const targetTask = draft.find((t) => t.id === task.id);

            if (targetTask) {
              targetTask.completed = true;
            }
          })
        );

        try {
          await queryFulfilled
        } catch {
          optimisticUpdate.undo()
        }
      }
    },
    postTasksByIdIncomplete: {
      // invalidatesTags: ["Task"],
      onQueryStarted: async (task, { dispatch, queryFulfilled }) => {
        const optimisticUpdate = dispatch(
          generatedApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const targetTask = draft.find((t) => t.id === task.id)

            if (targetTask) {
              targetTask.completed = false
            }
          })

        )

        try {
          await queryFulfilled
        } catch {
          optimisticUpdate.undo()
        }
      }
    },
  },
});

export const {
  useDeleteTasksByIdMutation,
  useGetTasksQuery,
  usePostTasksByIdCompleteMutation,
  usePostTasksByIdIncompleteMutation,
  usePostTasksMutation,
} = enhancedApi;
