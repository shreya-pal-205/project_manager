import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import { PRIORITY_DATA } from "../../utils/data";
import SelectDropdown from "../../components/inputs/SelectDropdown";
import SelectUsers from "../../components/inputs/SelectUsers";
import TodoListInput from "../../components/inputs/TodoListInput";
import AddAttachmentsInput from "../../components/inputs/AddAttachmentsInput";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/layouts/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const createTask = async () => {
    setLoading(true);

    try{
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false
      }))

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      })
      clearData();

    }catch(error){
      console.log("Error creating task", error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };





  const updateTask = async () => {
    setLoading(true);

    try{
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodoChecklist.find((task) => task.text == item);

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        }
      })

      const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      })
    }catch(error){
      console.error("Error creating task:", error);
      setLoading(false);
    }finally{
      setLoading(false)
    }
  };





  const handleSubmit = async () => {
    setError(null);

    if (!taskData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!taskData.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!taskData.priority.trim()) {
      setError("Priority is required");
      return;
    }

    if (!taskData.dueDate) {
      setError("Due Date is required");
      return;
    }

    if (!taskData.assignedTo || taskData.assignedTo.length === 0) {
      setError("At least one user must be assigned");
      return;
    }

    if (!taskData.todoChecklist || taskData.todoChecklist.length === 0) {
      setError("Please add at least one TODO checklist item");
      return;
    }

    if(taskId){
      updateTask();
      return;
    }

    createTask();


    // If everything is valid
    setError("");
  };




  const getTaskDetailsByID = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId))

      if(response.data){
      const taskInfo = response.data;
      setCurrentTask(taskInfo);

      setTaskData((prevState) => ({
        title: taskInfo.title,
        description: taskInfo.description,
        priority: taskInfo.priority,
        dueDate: taskInfo.dueDate ? moment(taskInfo.dueDate).format("YYYY-MM-DD") : null,
        assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
        todoChecklist: taskInfo?.todoChecklist?.map((item) => item?.text) || [],
        attachments: taskInfo?.attachments || []
      }))
    }
  }catch(error) {
    console.error("Error fetching users:", error)
  }
    
  };





  const deleteTask = async () => {
    try{
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

      setOpenDeleteAlert(false);
      navigate('/admin/tasks')
    }catch(error){
      console.error("Error deleting expense:", error.response?.data?.message || error.message)
    }
  };




  useEffect(() => {
      if(taskId){
        getTaskDetailsByID(taskId);
      }

      return () => {};
    }, [taskId])




  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="min-h-screen bg-gradient-to-b from-[#E0F7FF] via-[#F2F8FF] to-[#FFFFFF] py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-bold text-[#1E3A8A]">
              {taskId ? "Update Task" : "Create Task"}
            </h2>
            {taskId && (
              <button
                onClick={() => setOpenDeleteAlert(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <LuTrash2 size={18} />
                Delete
              </button>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Task Title */}
            <div className="col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Task Title
              </label>
              <input
                placeholder="e.g., Create App UI"
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Describe the task..."
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Priority
              </label>
              <SelectDropdown
                options={PRIORITY_DATA}
                value={taskData.priority}
                onChange={(value) => handleValueChange("priority", value)}
                placeholder="Select priority"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={taskData.dueDate || ""}
                onChange={({ target }) =>
                  handleValueChange("dueDate", target.value)
                }
              />
            </div>

            {/* Assign To */}
            <div className="col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Assign To
              </label>
              <SelectUsers
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(value) =>
                  handleValueChange("assignedTo", value)
                }
              />
            </div>

            {/* Todo Checklist */}
            <div className="col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                TODO Checklist
              </label>
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>

            {/* Attachments */}
            <div className="col-span-2">
              <label className="block mb-2 font-semibold text-gray-700">
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 font-medium text-center mt-4">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end mt-8 gap-4">
            <button
              onClick={clearData}
              className="px-6 py-2 rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 transition"
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {taskId ? "UPDATE TASK" : "CREATE TASK"}
            </button>
          </div>
        </div>
      </div>


      <Modal
         isOpen={openDeleteAlert}
         onClose={() => setOpenDeleteAlert(false)}
         title="Delete Task"
       >
       <DeleteAlert
         content="Are you sure you want to delete this task?"
         onDelete={() => deleteTask()}
      /> 
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
