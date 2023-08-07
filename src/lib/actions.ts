import { GraphQLClient } from "graphql-request";
import { customAlphabet } from "nanoid";

import { createProjectMutation, createUserMutation, deleteProjectMutation, updateProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery } from "@/graphql";
import {ProjectForm} from "@/lib/common.types";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/token`);
        return response.json();
    } catch (err) {
        throw err;
    }
};
export const fetchCurrentUser = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/session`);
        return response.json();
    } catch (err) {
        throw err;
    }
};

export const uploadImage = async (imagePath: string) => {
    console.log("uploadImage", imagePath)
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({
                path: imagePath,
            }),
        });
        return response.json();
    } catch (err) {
        throw err;
    }
};

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables);
    } catch (err) {
        throw err;
    }
};

export const fetchAllProjects = (category?: string | null, endcursor?: string | null) => {
    client.setHeader("x-api-key", apiKey);

    return makeGraphQLRequest(projectsQuery, { category, endcursor });
};

export const createNewProject = async (form: ProjectForm) => {
    // const imageUrl = await uploadImage(form.image);
    const user = await fetchCurrentUser();
    const {token} = await fetchToken();

    // if (imageUrl.url) {
        client.setHeader("Authorization", `Bearer ${token}`);

    console.log(token);
    console.log(user)
    return ;

        const variables = {
            input: {
                ...form,
                code: nanoid(6),
                createdBy: {
                    link: user?.id
                }
            }
        };

        return makeGraphQLRequest(createProjectMutation, variables);
    // }
};

export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
    function isBase64DataURL(value: string) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
    }

    let updatedForm = { ...form };

    // const isUploadingNewImage = isBase64DataURL(form.image);
    //
    // if (isUploadingNewImage) {
    //     const imageUrl = await uploadImage(form.image);
    //
    //     if (imageUrl.url) {
    //         updatedForm = { ...updatedForm, image: imageUrl.url };
    //     }
    // }

    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
        id: projectId,
        input: updatedForm,
    };

    return makeGraphQLRequest(updateProjectMutation, variables);
};

export const deleteProject = (id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`);
    return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const getProjectDetails = (id: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const createUser = (name: string, email: string, avatarUrl?: string) => {
    client.setHeader("x-api-key", apiKey);

    const variables = {
        input: {
            name: name,
            email: email,
            avatarUrl: avatarUrl
        },
    };

    return makeGraphQLRequest(createUserMutation, variables);
};

export const getUserProjects = (id: string) => {
    console.log(id)
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectsOfUserQuery, { id: id });
};

export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
};
export const getCurrentSession = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/session`);
        return response.json();
    } catch (err) {
        throw err;
    }
};


const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    6,
); // 6-character random string

export const createPost = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;

    try {
        const response = new Promise((resolve, reject)=> {
           resolve({})
        });
        return response;
    } catch (error: any) {
        if (error.code === "P2002") {
            return {
                error: `This title is already taken`,
            };
        } else {
            return {
                error: error.message,
            };
        }
    }
}

export const getPost = async () => {
    try {
        const response =  setTimeout(()=> {
            return {title: 'title', content: 'content'} ;
        }, 1000);
        return response ;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export const updatePost = async (id: string, data: any) => {

    try {
        const response = new Promise((resolve, reject)=> {
            resolve({})
        });
        return response;
    } catch (error: any) {
        if (error.code === "P2002") {
            return {
                error: `This  is already taken`,
            };
        } else {
            return {
                error: error.message,
            };
        }
    }
}
export const createSubDomain = async (formData: FormData) => {


    try {
        const response = new Promise((resolve, reject)=> {
            resolve({})
        });
        return response;
    } catch (error: any) {
        if (error.code === "P2002") {
            return {
                error: `This subdomain is already taken`,
            };
        } else {
            return {
                error: error.message,
            };
        }
    }
};
//
// export const updateSite = withSiteAuth(
//     async (formData: FormData, site: any, key: string) => {
//         const value = formData.get(key) as string;
//
//         try {
//             const response = new Promise(()=> {});
//             return response;
//         } catch (error: any) {
//             if (error.code === "P2002") {
//                 return {
//                     error: `This ${key} is already taken`,
//                 };
//             } else {
//                 return {
//                     error: error.message,
//                 };
//             }
//         }
//     },
// );
//
// export const deleteSite = withSiteAuth(async (_: FormData, site: any) => {
//     try {
//         const response = new Promise(()=> {});
//         return response;
//     } catch (error: any) {
//         return {
//             error: error.message,
//         };
//     }
// });
