
import { useState } from 'react';
import '../UserDashBoardLogicPanelCss/UserDashPanelFAQ.css'

function  UserDashPanelHelp () {
    const [active, setActive] = useState(null);

    const faqs = [
        { id: 1, title: "What is ToDo Web?", text: "ToDo Web is a web application for managing tasks, where you can create, edit, and track your progress." },
        { id: 2, title: "How to add a task?", text: "Click the 'Add Task' button, fill in the fields, and save — the task will appear in the list." },
        { id: 3, title: "How to delete a task?", text: "Click the delete icon next to the task. The app will ask for confirmation." },
        { id: 4, title: "Can I edit a task?", text: "Yes, click the edit icon to modify the task." },
        { id: 5, title: "How to mark a task as completed?", text: "Check the box next to the task to mark it as completed." },
        { id: 6, title: "Are my tasks saved?", text: "Yes, all tasks are saved in the database and are available after reloading." },
        { id: 7, title: "Can I filter tasks?", text: "Yes, you can filter tasks by status, priority, and date." },
        { id: 8, title: "Is registration required?", text: "Registration is needed to save your tasks online and access them from any device." },
        { id: 9, title: "What if something doesn't work?", text: "Try refreshing the page or contact us at support." },
    ];
    
    return(
        <div className='Faq-Container'>
            <div className='faq-header'>
                <h3>FAQ — Frequently Asked Questions</h3>
            </div>

            <div className='faq-buttons'>
                {faqs.map((item) =>(
                    <button key={item.id} onClick={() => setActive(item)}>
                        {item.title}
                    </button>
                ))}
            </div>

            {active && (
                <div className='faq-answers'>
                    <div className='faq-title'>
                        {active.title}
                    </div>

                    <div className='faq-text'>
                        {active.text}
                    </div>

                    <button className='faq-answer-close' onClick={() => setActive(null)}>Close</button>
                </div>
            )}
        </div>
    )
}

export default UserDashPanelHelp;