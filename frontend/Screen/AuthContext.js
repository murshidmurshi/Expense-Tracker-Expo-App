import React, { createContext, useEffect, useState, } from 'react'
import { Basepath } from './Global'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export const AuthContext = createContext()

export const AuthProvider = ({ children, navigation }) => {

    const [memberToken, setMemberToken] = useState(null)
    const [adminToken, setAdminToken] = useState(null)

    const [loginvalue, setLoginValue] = useState({})
    const [register, setRegister] = useState({})
    const [isloading, setIsLoading] = useState(true)

    const [loginSpinner, setLoginSpinner] = useState(false)
    const [loginerror, setLoginError] = useState('')

    const [registerspinner, setRegisterSpinner] = useState(false)
    const [registererror, setRegisterError] = useState('')

    const [single, setSingle] = useState([])

    const [projectwork, setProjectWork] = useState([])
    const [projectexpense, setProjectExpense] = useState([])
    const [admin_details, setAdminDetail] = useState({})

    const [theme, setTheme] = useState(Appearance.getColorScheme())

    const [membertheme, setMemberTheme] = useState(Appearance.getColorScheme())


    const loadThemeFromStorage = async () => {
        try {
            //For Admin
            const storedTheme = await AsyncStorage.getItem('adminTheme');
            // console.log(storedTheme,'AdminAsync');
            if (storedTheme !== null) {
                // Theme is stored in AsyncStorage
                setTheme(storedTheme);
            } else {
                // Theme is not stored, default to "light"
                setTheme('light');
            }
            //   For Member
            const storedMemberTheme = await AsyncStorage.getItem('memberTheme');
            // console.log(storedMemberTheme,'MemberAsync');
            if (storedMemberTheme !== null) {
                // Theme is stored in AsyncStorage
                setMemberTheme(storedMemberTheme);
            } else {
                // Theme is not stored, default to "light"
                setMemberTheme('light');
            }


        } catch (error) {
            console.error('Error loading theme from AsyncStorage:', error);
        }
    };





    let AdminStyles = {
        backgroundColor: (theme == 'dark' ? 'black' : 'rgb(256,256,256)'),
        ModalBackGround: (theme == 'dark' ? 'rgb(62, 62, 62)' : 'rgb(256,256,256)'),
        ModalInput: (theme == 'dark' ? 'rgba(102, 101, 101, 0.526)' : '#f6f6ff'),
        Modalbutton: (theme == 'dark' ? 'white' : 'black'),
        ModalHeader: (theme == 'dark' ? 'white' : 'grey'),

        color: (theme == 'dark' ? 'white' : 'black'),
        statisticsColor: (theme == 'dark' ? 'rgba(256,256,256,1)' : 'rgb(38, 37, 37)'),

        GreyWhite: (theme == 'dark' ? 'rgb(215, 214, 214)' : 'grey'),

        tabBarIcon: (theme == 'dark' ? 'rgba(256,256,256,1)' : 'rgba(33, 33, 33, 0.907)'),
        cardBackGround: theme === 'dark' ? 'rgb(49, 49, 49)' : 'white',
        GreenColor: 'rgb(136, 215, 136)',
        RedColor: "rgb(231, 147, 147)",
        PurpleColor: 'rgb(158, 158, 244)',
        DescriptionBackGround: theme == 'dark' ? 'rgba(68, 68, 68, 0.729)' : 'rgb(244, 241, 241)',
    }
    let MemberStyles = {
        backgroundColor: membertheme == 'dark' ? 'black' : 'rgb(256,256,256)',
        ModalBackGround: (membertheme == 'dark' ? 'rgb(62, 62, 62)' : 'rgb(256,256,256)'),
        ModalInput: (membertheme == 'dark' ? 'rgba(102, 101, 101, 0.526)' : '#f6f6ff'),
        Modalbutton: (membertheme == 'dark' ? 'white' : 'black'),
        ModalHeader: (membertheme == 'dark' ? 'white' : 'grey'),
        color: (membertheme == 'dark' ? 'white' : 'black'),
        statisticsColor: (membertheme == 'dark' ? 'rgba(256,256,256,1)' : 'rgb(38, 37, 37)'),
        GreyWhite: (membertheme == 'dark' ? 'rgb(215, 214, 214)' : 'grey'),
        tabBarIcon: (membertheme == 'dark' ? 'rgba(256,256,256,1)' : 'rgba(33, 33, 33, 0.907)'),
        cardBackGround: membertheme === 'dark' ? 'rgb(49, 49, 49)' : 'white',
        GreenColor: 'rgb(136, 215, 136)',
        RedColor: "rgb(231, 147, 147)",
        PurpleColor: 'rgb(158, 158, 244)',
        DescriptionBackGround: membertheme == 'dark' ? 'rgba(68, 68, 68, 0.729)' : 'rgb(244, 241, 241)',
    }


    const [refresh, setRefresh] = useState(false)

    const RefreshPage = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        }, 1000)
    }


    const Logout = async () => {
        console.log('logout');
        await AsyncStorage.removeItem('AdminToken')
        await AsyncStorage.removeItem('MemberToken')

        let MemberToken = await AsyncStorage.getItem('MemberToken')
        console.log(MemberToken, 'AfterMemberTokenLogout');

        let AdminToken = await AsyncStorage.getItem('AdminToken')
        console.log(AdminToken, 'AfterAdminTokenLogout');

        setAdminToken(null)
        setMemberToken(null)
    }

    const LoginFunc = async () => {
        setLoginSpinner(true)
        console.log(loginvalue, 'VAlueeee');
        let AdminAuth = { "email": "M", "password": "M" }
        let Find = AdminAuth?.email == loginvalue?.email && AdminAuth?.password == loginvalue?.password
        if (Find) {
            console.log('This is Admin');
            await axios.post(`${Basepath}/admin/login`, loginvalue)
                .then(async (res) => {
                    if (res.data.success) {
                        console.log('Successfulll');
                        let authtoken = res.data.authtoken;
                        await AsyncStorage.setItem('AdminToken', (authtoken))

                        setAdminToken(authtoken)

                        setLoginSpinner(false)
                        setLoginValue({})
                    }
                    if (res.data.error) {
                        console.log(res.data.error, 'Error.....');
                        setLoginError(res.data.error)
                        setLoginSpinner(false)
                    }

                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {

            await axios.post(`${Basepath}/member/login`, loginvalue)
                .then(async (res) => {
                    if (res.data.success) {
                        console.log('Successfulll');
                        let authtoken = res.data.authtoken;
                        console.log(authtoken, 'AuthTokennnnnnnn');

                        await AsyncStorage.setItem('MemberToken', (authtoken))
                        setMemberToken(authtoken)

                        setLoginSpinner(false)
                        setLoginValue({})
                    }
                    if (res.data.error) {
                        console.log(res.data.error, 'Error.....');
                        setLoginError(res.data.error)
                        setLoginSpinner(false)
                    }

                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }



    const IsLoggedIn = async () => {
        try {
            let admintoken = await (AsyncStorage.getItem('AdminToken'))
            console.log(admintoken, 'ADDD');
            let membertoken = await (AsyncStorage.getItem('MemberToken'))
            console.log(membertoken, 'MEmm5555');
            setAdminToken(admintoken)
            setMemberToken(membertoken)
            setIsLoading(false)
        }
        catch (err) {
            console.log('Error is:', err);
        }
    }


    const SingleProject = async (projectId, memberId) => {
        await axios.get(`${Basepath}/project/view-project/${projectId}`,)
            .then((res) => {
                // console.log(res.data.project,'SingleProject-----------');
                setSingle(res.data.project)
            })
            .catch((err) => {
                console.log(err);
            })

        await axios.get(`${Basepath}/work/view-project-work/${projectId}`,)
            .then((res) => {
                setProjectWork(res.data.work)
                // console.log(res.data,100);
            })
            .catch((err) => {
                console.log(err);
            })

    }


    const SingleProjectExpense = async (workId) => {

        await axios.get(`${Basepath}/expense/view-project-expense/${workId}`)
            .then((res) => {
                // setProjectWork(res.data.work)
                // console.log(res.data);
                setProjectExpense(res.data.expense)

                // console.log(res.data,100);
            })
            .catch((err) => {
                console.log(err);
            })

    }
    
    const GetAdminDetail = async () => {
        await axios.get(`${Basepath}/admin/view-detail`)
            .then((res) => {
                // console.log(res.data.admin_details, 'AdminDetail');
                setAdminDetail(res.data.admin_details[0])
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const [ongoingProjects, setOngoingProject] = useState([])
    const [completedProjects, setCompletedProject] = useState([])
    const [memberdetail, setMemberDetail] = useState([])

    const MemberSingleProjectData = async () => {
        await axios.get(`${Basepath}/member/view_single_project`, { headers: { 'auth-token': (memberToken) } })
            .then((res) => {
                setMemberDetail(res.data.member_details)
                setOngoingProject(res.data.ongoingProjects)
                setCompletedProject(res.data.completedProjects)
                // setMemberDetail(member_details)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        IsLoggedIn()
        loadThemeFromStorage()
    }, [])

    //This useEffect only for Check Token,From AsyncStorage --


    return (
        <>
            <AuthContext.Provider value={{ memberToken, adminToken, loginvalue, setLoginValue, LoginFunc, register, setRegister, isloading, setIsLoading, Logout, loginSpinner, setLoginSpinner, loginerror, setLoginError, registerspinner, setRegisterSpinner, registererror, setRegisterError, SingleProject, single, projectwork, SingleProjectExpense, projectexpense, admin_details, GetAdminDetail, refresh, RefreshPage, theme, setTheme, membertheme, setMemberTheme, AdminStyles, MemberStyles, MemberSingleProjectData, ongoingProjects, completedProjects, memberdetail }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}