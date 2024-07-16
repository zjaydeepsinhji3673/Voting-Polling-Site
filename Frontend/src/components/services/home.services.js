
import { request, requestForFile } from '../utils/axios.service';


/////////////////////////   ADMIN SIDE APIS    ////////////////////////////////
export const getUserLoginData = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/login`, "POST", false, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const RegisterUserData = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/register`, "POST", false, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
}

export const UserLogout = () => {
    return request(`${process.env.REACT_APP_USER_API}/logout`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const sendCreatePollData = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/create_poll`, "POST", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
}

export const PollData = () => {
    return request(`${process.env.REACT_APP_USER_API}/voting`, "GET", true)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
export const PollDataAnswer = () => {
    return request(`${process.env.REACT_APP_USER_API}/voting_answer`, "GET", true)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const AnswerforVote = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/answer_for_post`, "POST", true, body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
}

export const getCounts = () => {
    return request(`${process.env.REACT_APP_USER_API}/get_counts`, "GET", true)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getMyPolls = () => {
    return request(`${process.env.REACT_APP_USER_API}/my_polls`, "GET", true)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getMyPollResult = () => {
    return request(`${process.env.REACT_APP_USER_API}/my_poll_result`, "GET", true)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const deletePollU = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/delete_poll`, "PUT", true, body)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        });
}