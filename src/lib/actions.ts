import {customAlphabet} from "nanoid";

import {
    createPostMutation,
    createProjectMutation, createSubDomainMutation,
    createUserMutation,
    deleteProjectMutation, getPostBySlugQuery, getProjectByCodeQuery,
    getProjectByIdQuery,
    getProjectsOfUserQuery,
    getUserQuery,
    projectsQuery, updatePostMutation,
    updateProjectMutation
} from "@/graphql";
import {PostForm, ProjectForm, UpdateForm} from "@/lib/common.types";
import {GraphQLClient} from "graphql-request";
import {isValidUrl, slugify} from "@/lib/utils";


type SubdomainRes ={ subdomainCreate: { subdomain: { id: string, name: string } } };

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';


const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    6,
); // 6-character random string

const client = new GraphQLClient(apiUrl);


const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables,);
    } catch (err) {
        throw err;
    }
};

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/token`);
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


export const createNewProject = async (name: string, userId: string, token: string) => {
        const code =  nanoid(6);
        const subdomain = slugify(name) + "-" + slugify(code);
        let subdomainRes: any;
        try {
            subdomainRes = await createSubDomain(subdomain, userId, token)!;

        } catch (err) {
            return err;
        }

    // const imageUrl = await uploadImage(form.image);

        client.setHeader("Authorization", `Bearer ${token}`);


    const variables: any = {
            input: {
                name,
                code,
                createdBy: {
                    link: userId
                },
                subdomain: {
                    link: subdomainRes?.subdomainCreate?.subdomain.id || ""
                }
            }
        };

        return await makeGraphQLRequest(createProjectMutation, variables);
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


export const getUser = (email: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
};

export const getUserProjects = (id: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectsOfUserQuery, { id: id });
};
export const getProjectByCode = (code: string) => {
    client.setHeader("x-api-key", apiKey);
    return makeGraphQLRequest(getProjectByCodeQuery, { code } );
};


export const createNewPost = async (formValues: PostForm, userId: string, projectId: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`);

    const formData: PostForm = {...formValues};

    if(formValues.thumbnail && !isValidUrl(formValues.thumbnail)) {
        const imageData = await uploadImage(formValues.thumbnail);
        formData.thumbnail = imageData ? imageData?.secure_url : formValues.thumbnail;
    }


    const variables: any = {
        input: {
            ...formData,
            createdBy: {
                link: userId
            },
            project: {
                link: projectId
            }
        }
    };

    return await makeGraphQLRequest(createPostMutation, variables);
};

export const getPostBySlug = async (slug: string) => {
    try {
        return await makeGraphQLRequest(getPostBySlugQuery, { slug });
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export const updatePost = async ( data: any, token: string) => {

    try {
        const formData: UpdateForm = {...data};

        if(data.thumbnail && !isValidUrl(data.thumbnail)) {
            const imageData = await uploadImage(data.thumbnail);
            formData.thumbnail = imageData ? imageData?.secure_url : data.thumbnail;
        }
        const { name, slug, description, thumbnail, content, published} = formData;
        client.setHeader("Authorization", `Bearer ${token}`);

        const variables: any = {
            by: {
                slug
            },
            input: {
                name, description, thumbnail, content, published
            }
        };

        return await makeGraphQLRequest(updatePostMutation, variables);
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}
export const createSubDomain = async ( subdomain: string, userId: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`);

    try {
        return await makeGraphQLRequest(createSubDomainMutation, { input: { name: subdomain } });
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
