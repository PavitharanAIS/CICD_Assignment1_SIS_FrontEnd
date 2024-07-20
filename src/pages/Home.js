import {Table} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import api from "../api";
import NavBar from "../components/Navbar";
import Container from "react-bootstrap/Container";
function Home() {

    const [students, setStudents] = useState([]);
    const [programmes, setProgrammes] = useState({});
    const [tuitionFees, setTuitionFees] = useState({});
    const [lecturers, setLecturers] = useState({});
    const [marks, setMarks] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch students
                const studentsResponse = await api.get('/api/student/');
                console.log('Students Response:', studentsResponse.data);
                setStudents(studentsResponse.data);

                // Extract foreign key IDs
                const programmeIds = [...new Set(studentsResponse.data.map(student => student.programme))];
                const tuitionFeeIds = [...new Set(studentsResponse.data.map(student => student.tuitionFee))];
                const lecturerIds = [...new Set(studentsResponse.data.map(student => student.lecturer))];
                const marksIds = [...new Set(studentsResponse.data.map(student => student.marks))];

                console.log('Programme IDs:', programmeIds);
                console.log('Tuition Fee IDs:', tuitionFeeIds);
                console.log('Lecturer IDs:', lecturerIds);
                console.log('Marks IDs:', marksIds);

                // Fetch related data
                const [programmesRes, tuitionFeesRes, lecturersRes, marksRes] = await Promise.all([
                    api.get(`/api/programme/?ids=${programmeIds.join(',')}`),
                    api.get(`/api/tuitionfee/?ids=${tuitionFeeIds.join(',')}`),
                    api.get(`/api/lecturer/?ids=${lecturerIds.join(',')}`),
                    api.get(`/api/marks/?ids=${marksIds.join(',')}`)
                ]);

                console.log('Programmes Response:', programmesRes.data);
                console.log('Tuition Fees Response:', tuitionFeesRes.data);
                console.log('Lecturers Response:', lecturersRes.data);
                console.log('Marks Response:', marksRes.data);

                setProgrammes(programmesRes.data.reduce((acc, prog) => {
                    acc[prog.id] = prog;
                    return acc;
                }, {}));
                setTuitionFees(tuitionFeesRes.data.reduce((acc, fee) => {
                    acc[fee.id] = fee;
                    return acc;
                }, {}));
                setLecturers(lecturersRes.data.reduce((acc, lec) => {
                    acc[lec.id] = lec;
                    return acc;
                }, {}));
                setMarks(marksRes.data.reduce((acc, mark) => {
                    acc[mark.id] = mark;
                    return acc;
                }, {}));
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, []);

    const getRelatedData = (id, data) => data[id] || {};

    /*const [student, setStudent] = useState([]);

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = () => {
        api
            .get("/api/student/")
            .then((res) => res.data)
            .then((data) => {
                setStudent(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };*/



    //  const deleteStudent = (id) => {
    //     api
    //         .delete(`/api/student/delete/${id}/`)
    //         .then((res) => {
    //             if (res.status === 204) alert("Student deleted!");
    //             else alert("Failed to delete student.");
    //             getStudent();
    //         })
    //         .catch((error) => alert(error));
    // };

    // const createStudent = (e) => {
    //     e.preventDefault();
    //     api
    //         .post("/api/student/", { name, roll, address, programme, lecturer, attendance, marks, tuitionFee })
    //         .then((res) => {
    //             if (res.status === 201) alert("Student created!");
    //             else alert("Failed to create student.");
    //             getStudent();
    //         })
    //         .catch((err) => alert(err));
    // };

    return (
        <div>
            <NavBar/>
                <Container>

                    <h1 className={"text-center p-4"}>Student Information</h1>
                    <Table striped bordered className={"w-auto h-auto"}>
                        <thead>
                            <tr className={"text-center"}>
                                <th>Name</th>
                                <th>Roll Number</th>
                                <th>Address</th>
                                <th>Programme</th>
                                <th>Lecturer</th>
                                <th>Attendance</th>
                                <th>Marks</th>
                                <th>Tuition Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className={"text-center"}>
                                <td>{student.name}</td>
                                <td>{student.roll}</td>
                                <td>{student.address}</td>
                                <td>{getRelatedData(student.programme, programmes).name}</td>
                                <td>{getRelatedData(student.lecturer, lecturers).name}</td>
                                <td>{student.attendance}</td>
                                <td>{getRelatedData(student.marks, marks).programmeMarks}</td>
                                <td>{getRelatedData(student.tuitionFee, tuitionFees).fee}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
        </div>
    );
}

export default Home