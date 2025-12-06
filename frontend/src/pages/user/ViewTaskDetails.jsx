import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status.toLowerCase()) {
      case "in-progress":
        return "bg-cyan-100 text-cyan-700 border border-cyan-200";
      case "completed":
        return "bg-green-100 text-green-700 border border-green-200";
      default:
        return "bg-indigo-100 text-indigo-700 border border-indigo-200";
    }
  };

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error("Error fetching task details", error);
    }
  };

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist];
    const taskId = id;

    if(todoChecklist && todoChecklist[index]){
      todoChecklist[index].completed = !todoChecklist[index].completed;

      try{
        const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId), {todoChecklist})
        if(response.status === 200){
          setTask(response.data?.task || task)
        }else{
          todoChecklist[index].completed = !todoChecklist[index].completed;
        }
      }catch(error){
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
    }
  };

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) getTaskDetailsById();
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="p-6 flex justify-center">
        {task ? (
          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-8 w-full max-w-4xl space-y-6">
            {/* Task Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
                📝 {task.title}
              </h2>
              <span
                className={`mt-2 md:mt-0 px-5 py-2 rounded-full font-semibold text-sm ${getStatusTagColor(
                  task.status
                )}`}
              >
                {task.status === "completed"
                  ? "✅ Completed"
                  : task.status === "in-progress"
                  ? "⏳ In Progress"
                  : "🟢 Pending"}
              </span>
            </div>

            {/* Portrait-style Task Info */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Description large */}
              <div className="flex-1 bg-gray-50 rounded-2xl p-6 shadow-inner">
                <h3 className="text-xl font-semibold mb-2">📄 Description</h3>
                <p className="text-gray-800 text-lg">{task.description}</p>
              </div>

              {/* Right-side small details */}
              <div className="flex flex-col gap-4 w-48">
                <InfoBox label="⚡ Priority" value={task.priority} small />
                <InfoBox
                  label="📅 Due Date"
                  value={task.dueDate ? moment(task.dueDate).format("Do MMM YYYY") : "N/A"}
                  small
                />
              </div>
            </div>

            {/* Todo Checklist */}
            <div className="bg-gray-50 rounded-2xl shadow-inner p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">✅ Todo Checklist</h3>
              <div className="space-y-3">
                {task.todoChecklist.map((item, index) => (
                  <TodoChecklist
                    key={`todo_${index}`}
                    text={item.text}
                    isChecked={item.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>
            </div>

            {/* Attachments */}
            {task.attachments?.length > 0 && (
              <div className="bg-gray-50 rounded-2xl shadow-inner p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">📎 Attachments</h3>
                <div className="space-y-2">
                  {task.attachments.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20 text-lg">Loading task details...</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

// ---------- Subcomponents ----------

const InfoBox = ({ label, value, small }) => (
  <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 ${small ? "text-sm" : "text-base"}`}>
    <p className="text-gray-500 font-medium">{label}</p>
    <p className={`text-gray-800 font-semibold mt-1 ${small ? "text-sm" : "text-base"}`}>{value}</p>
  </div>
);

const TodoChecklist = ({ text, isChecked, onChange }) => (
  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition shadow-sm">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="w-6 h-6 text-indigo-600 border-gray-300 rounded"
    />
    <span className={`${isChecked ? "line-through text-gray-400" : "text-gray-800"} text-lg`}>
      {isChecked ? "✔️ " : "🟩 "} {text}
    </span>
  </div>
);

const Attachment = ({ link, index, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition shadow-sm"
  >
    <div className="flex items-center space-x-3">
      <span className="font-mono text-gray-500">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
      <p className="text-indigo-600 underline truncate max-w-xs">📎 {link}</p>
    </div>
    <LuSquareArrowOutUpRight className="text-gray-500" />
  </div>
);
