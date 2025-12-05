import styles from "./page.module.css"

export default function BookAppointmentPage() {
    return (
        <div className={styles.container}>
            <form className={styles.form_container}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>

            {/* Google Calendar */}
            <div className={styles.calendarBox}>
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FVancouver&showPrint=0&src=anVudWkwODIxQGdtYWlsLmNvbQ&src=MDc2MDk1NTAxNWU5MGI4NWQyY2VlMTYxMzE4NDJlY2E4NmU5YjA0YzdmM2RjNzkwYTIzMjEzODBmZjM2NzAyYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTA2NTI1Nzk5NTY0OTY1NzE0OTY3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=amE1aGY3N3JtbzU2M2R0YnBhcXVqaHZkaDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986cb&color=%23ad1457&color=%23004d40&color=%23795548"
                    style={{ border: 0 }}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
            </div>
        </div>
    )
}