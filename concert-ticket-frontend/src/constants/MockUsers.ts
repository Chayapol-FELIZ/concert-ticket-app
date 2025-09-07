import { Role } from "@/store/slice/userSlice";

interface MockUsers {
    _id: string;
    username: string;
    password: string;
    name: string;
    role: Role
}

export const mockUsers: MockUsers[] = [
    {
        _id: 'd57d14aa-8291-4c6d-bb5c-aa867e98b2ff',
        username: 'admin',
        password: 'P@ssw0rd',
        name: 'Alice (Admin)',
        role: 'admin',
    },
    {
        _id: 'e6d987b7-dc26-4561-84b8-a1df17b1c805',
        username: 'user',
        password: 'P@ssw0rd',
        name: 'Bob (User)',
        role: 'user',
    },
]