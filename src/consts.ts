import {IP, PORT} from '@env'

export const Colors = {
    primary: '#8EA7E9',
    secondery: '#7286D3',
    light: '#E5E0FF',
    basicGrey: '#C6C0D2',
    background: 'white',
    pink: "#E45082",
}

export const BASE_URL = `http://10.0.0.10:${PORT}/api`;

export enum Pages {
    Landing = "Landing",
    Login = "Login",
    Register = "Register",
    Info = "Info",
    NavBar = "NavBar",
    GettingReady = "GettingReady",
    CurrentEvent = "CurrentEvent",
    Settings = "Settings",
    Walkthrough = "Walkthrough",
    PickView = "PickView",
    ForgetPassword = "ForgetPassword",
    Home = "Home",
    Calendar = "Calendar",
    ToDo = "ToDo",
    Notes = "Notes"
}


export const Strings= {
    login_page_header: "Login",
    settings_page_header: "Settings",
    register_page_header: "Sign Up",
    user_field_header: "User Name",
    email_field_header: "Email",
    password_field_header: "Password",
    reenter_password_field_header:"Confirm Password",
    new_password_field_header: "New Password",
    register_page_button: "Sign Up",
    login_page_button: "Login",
    login_page_forget_password_button: "Forget Password?",
    register_page_already_have_account: "Allready have an account?",
    info_page_address_field_label: "Your home address",
    info_page_contact_field_label: "Emergency contact",
    back_button: "Back",
    ok_button: "OK",
    cancle_button: "Cancle",
    done_button: "Done!",
    title_field_header: "Title",
    content_field_header: "Content",
    location_field_header: "Location",
    date_field_header: "Date",
    time_field_header: "Time",
    popup_menu_edit_button: "Edit",
    popup_menu_delete_button: "Delete",
    popup_menu_start_now_button: "Start Now!",
    popup_menu_add_to_calendar_button: "Add To Calnader",
    getting_ready_empty_tasks_message: "No Tasks Planned",
    log_out_button: "Log Out",
    empty_events_message: "No events are planned, let's add some +",
    next_event_title: "Your Next Event",
    empty_tasks_message: "No tasks are planned. Let's add some +", 
    next_tasks_title: "Your Next Tasks", 
    notes_header: "Your Notes", 
    new_note_button: "New Note +", 
    tasks_header: "Your Tasks",
    new_tasks_button: "New Task +",
    starting_date_header: "Starting Date",
    ending_date_header: "Ending Date",
    new_task_header: "New Task",
    edit_task_header: "Edit Task",
    task_field_header: "Task",
    edit_note_header: "Edit Note",
    preferences_header: "Preferences",
    send_notification_prompt: "Send notification in time to get ready to event?",
    getting_ready_mode_label: "Getting ready mode:",
    getting_ready_time_prompt: "How much minutes it takes you to get ready?",
    time_minutes_label: "Time (in minutes):",
    getting_ready_tasks_prompt: "Create automatically tasks for help you getting ready?",
    getting_ready_tasks_label: "Getting ready tasks:",
    tasks_from_event_prompt: "Would you like to create tasks from the notes taken in this event?",
    current_event_record_notes: "You can record the meeting",
    current_event_notes: "Or take some notes",
    forget_password_header: "Enter details for restore",
    navigate_button : "Navigate",
    need_directions_note: "Need directions?",
    tasks_list_current_event_header: "Your Next Tasks:",
    start_event_button: "start event",
    need_help: "Need some help?",
    call_help_button: "Call Help",
    navigate_home_button: "Go Home",
    select_user_header: "Which user is in this device?",
    main_user_title: "Main User",
    supervisior_user_title: "Supervisior",
    fill_details_header: "Please fill in some details:",
    sign_in_button: "SIGN ME IN !",
    organize_day: "Let's organize the day!",
    plan_schedule: "Plan the schedule",
    add_events: "Add events +",
    give_tasks: "Give them some tasks",
    add_tasks: "Add tasks +",
    update_events: "Want to update on their last events?",
    go_to_notes: "Go to Notes",
    notification_header: "Event coming up",
    error_passwords_not_match: "Passwords do not match.",
    error_login_data: "Mail or password are incorrect.",
    error_login_connection: "Error logging in user:",
    error_user_exist: "User with the same mail address already exist",
    error_register_connection: "Error signing up in user:",
    error_editing_connection: "Error in editing user:",
    settings_page_account: "Account",
    settings_page_preferences: "Preferences",
    settings_page_help: "Help",
    settings_page_logout: "Logout",
    info_alert_header: "Notice",
    reset_password_prompt: "Password updated succefully",
    help_content: 
    `Welcome to the IGotThis Help Center!
        Frequently Asked Questions (FAQs):
    
    1. How do I get started with IGotThis?
       - Simply download the app from the App Store or Google Play and follow the on-screen instructions to create your account.
    
    2. How do I set reminders for my tasks?
       - To set a reminder, go to the Todos section, select the item, and tap on the "Add To Calender" button. Choose your desired time and receive notifications when it's time to complete the task.
    
    3. Can I customize the app to fit my preferences?
       - Absolutely! IGotThis offers customizable settings to cater to your individual needs. You can change the getting ready time at the settings menu under "Preferences".
    
    We're here to assist you every step of the way. If you have any feedback, suggestions, or need further assistance, please don't hesitate to reach out to us. Your satisfaction is our top priority.
    
    Thank you for choosing IGotThis. Let's make your daily management easier and more enjoyable!`
}
