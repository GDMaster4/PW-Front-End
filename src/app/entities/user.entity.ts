export interface User
{
  id?: string,
  email: string;
  password: string;
  cognomeTitolare: string;
  nomeTitolare:string;
  fullName?: string,  
}