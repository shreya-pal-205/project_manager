import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogOut,
} from "react-icons/lu";


export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/admin/dashboard",
    },
    {
        id: "02",
        label: "Manage Tasks",
        icon: LuClipboardCheck,
        path: "/admin/tasks",
    },
    {
        id: "03",
        label: "Create Task",
        icon: LuSquarePlus,
        path: "/admin/create-task",
    },
    {
        id: "04",
        label: "Team Members",
        icon: LuUsers,
        path: "/admin/users",
    },
    {
        id: "05",
        label: "Email Generator",
        icon: LuUsers,
        path: "/admin/email-generator",
    },
    {
        id: "06",
        label: "Excel Summarizer",
        icon: LuUsers,
        path: "/admin/summarize",
    },
    {
        id: "07",
        label: "Meeting Scheduler",
        icon: LuUsers,
        path: "/admin/meeting",
    },
    {
        id: "08",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },

]




export const SIDE_MENU_USER_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/user/dashboard",
    },
    {
        id: "02",
        label: "My Tasks",
        icon: LuClipboardCheck,
        path: "/user/tasks",
    },
    
    {
        id: "08",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },

]




export const PRIORITY_DATA = [
    {label: "low", value: "low"},
    {label: "medium", value: "medium"},
    {label: "high", value: "high"}
]




export const STATUS_DATA = [
    {label: "pending", value: "pending"},
    {label: "in-progress", value: "in-progress"},
    {label: "completed", value: "completed"}
]