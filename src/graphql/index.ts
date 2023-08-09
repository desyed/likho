export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				name
				code
			}
		}
	}
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
			}
		}
	}
`;

export const projectsQuery = `
  query getProjects($category: String, $endcursor: String) {
    projectSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteUrl
      githubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

`query Project {
  project(by: {}) {
    
  }
}`
export const getProjectByCodeQuery = `
  query GetProjectByCode($code: String) {
    project(by: { code: $code }) {
        name
        code
        logo
        description
        subdomain {
          name
          id
        }
        posts(first: 100) {
          edges {
            node {
              name
              slug
              description
              thumbnail
              published
              id
            }
          }
        }
        id
    }
  }
`;

export const getUserQuery = `
  query GetUser($email: Email!) {
    user(by: { email: $email }) {
      id
      name
      email
    }
  }
`;


export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!){
      user(by: {id: $id}) {
        projects(first: 100) {
          edges {
            node {
              name
              code
              liveSiteUrl
              subdomain {
                name
                id
              }
              posts(first: 100) {
                edges {
                  node {
                    name
                    slug
                    description
                    thumbnail
                    content
                    type
                    published
                    id
                  }
                }
              }
              id
            }
          }
        }
        id
        email
        name
        avatarUrl
        description
      }
  }
`;

// name, project, user
export const createSubDomainMutation = `
	mutation SubdomainCreate($input: SubdomainCreateInput!) {
		subdomainCreate(input: $input) {
			subdomain {
			    id
				name
			}
		}
	}
`;

export const deleteSubdomainMutation = `
  mutation SubdomainDelete($id: ID!) {
    subdomainDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const createPostMutation = `
	mutation PostCreate($input: PostCreateInput!) {
		postCreate(input: $input) {
			post {
				name
			}
		}
	}
`;

export const updatePostMutation = `
	mutation PostUpdate($by: PostByInput!, $input: PostUpdateInput!) {
		postUpdate(by: $by, input: $input) {
			post {
				name
                slug
                description
                thumbnail
                content
                type
                published
                createdAt
                updatedAt
                id
			}
		}
	}
`;

export const getPostBySlugQuery = `
  query GetPost($slug: String!) {
    post(by: { slug: $slug }) {
        id
        name
        slug
        description
        thumbnail
        content
        type
        published
        createdAt
        updatedAt
    }
  }
`;
