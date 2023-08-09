import { User, Session } from 'next-auth'

export interface ProjectInterface {
    name: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    category: string;
    id: string;
    createdBy: {
        name: string;
        email: string;
        avatarUrl: string;
        id: string;
    };
}
export interface PostInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: {
        name: string;
        email: string;
        avatarUrl: string;
        id: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    projects: {
        edges: { node: ProjectInterface }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        };
    };
    posts: {
        edges: { node: PostInterface }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        };
    };
}

export interface SessionInterface extends Session {
    user: User & {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    };
}
export interface TokenInterface{
        id: string;
        name: string;
        email: string;
        image: string;
        token: string;
}

export interface ProjectForm {
    name: string;
}
export interface PostForm {
    name: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    content: string;
    published?: boolean;
    project?: any;
    createdBy?: any;
    type?: string;
}

export interface UpdateForm {
    id: string;
    name: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    content: string;
    published?: boolean;
    project?: any;
    createdBy?: any;
    type?: string;
}

export interface TokenInfo {
    id: string;
    token: string;
    name: string;
    image: string;
    email: string;
}