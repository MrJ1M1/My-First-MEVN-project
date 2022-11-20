import axios from 'axios'

const url = 'http://localhost:5000/api/posts';

export default class API {
    // to get All the posts from the server
    static async getAllPosts(){
        const response = await axios.get(url);
        return response.data;
    }

    // to get a Post by ID
    static async getPostById(id){
        const response = await axios.get(`${url}/${id}`);
        return response.data;
    }

    // to insert post into database
    static async addPost(post) {
        const response = await axios.post(url, post);
        return response.data;
    }

    // to update post into database
    static async updatePost(id, post) {
        const response = await axios.patch(`${url}/${id}`, post)
        return response.data;
    }

    // to delete a post
    static async deletePost(id){
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    }

}
