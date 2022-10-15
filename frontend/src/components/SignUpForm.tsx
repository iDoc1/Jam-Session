import React from "react";
import "./style.css"
import axios from "axios";

const emailRegex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface SignUpProps {
    name?: any;
    value?: any;
}

interface SignUpState {
    email : string,
    password : string,
    repeatPassword : string,
    errors : {
        email : string,
        password : string,
        repeatPassword : string
    },
    success: boolean
}

export class SignUp extends React.Component<SignUpProps, SignUpState>{
    constructor(props: SignUpProps) {
        super(props)
        const initialState = {
            email : '',
            password : '',
            repeatPassword : '',
            errors : {
                email : '',
                password : '',
                repeatPassword : ''
            },
            success: false
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange = (event: any) => {
        event.preventDefault()
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch( name ) {
            case 'email':
                errors.email = emailRegex.test(value)? '': 'Email is not valid!';
                break
            case 'password':
                errors.password = value.length < 8 ? 'Password must be eight characters long!': '';
                break
            case 'repeatPassword':
                errors.repeatPassword = this.state.password === event.target.value? '': 'Password do not match!';
                break
            default:
                break
        }
        this.setState(Object.assign(this.state, {errors, [name]: value}))
    }
    handleSubmit = async (event:any) => {
        event.preventDefault();
        try{
            const body = {
                    "email": this.state.email,
                    "password": this.state.password,
                    "re_password": this.state.repeatPassword
                }
            
            const response = await axios.post(
                'http://localhost:8000/auth/users/',
                body
                )
            this.setState({success: true})
            console.log('success')
        }
        catch(err:any){

            if (err.response.data.email) {
                // Error string isn't capitalized
                let string = err.response.data.email[0]
                const errors = {...this.state.errors, 'email': string[0].toUpperCase() + string.slice(1)};
                
                this.setState({errors})
                console.log('email err', this.state);

                
            }
            if (err.response.data.password) {
                const errors = {...this.state.errors, 'password': err.response.data.password[0]};
                
                this.setState({errors})
                console.log('password err', this.state);

            }
            // console.log(err);
            // console.log(err.response.data.password[0]);
        }
        
    }

    render() {
        const { errors } = this.state
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Sign Up</h2>
               <form onSubmit={this.handleSubmit} noValidate >
                    <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onChange={this.handleChange}/>
                        {errors.email.length > 0 && <span style={{color: 'red'}}>{errors.email}</span>}
                    </div>
                    <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onChange={this.handleChange}/>
                        {errors.password.length > 0 && <span style={{color: 'red'}}>{errors.password}</span>}
                    </div>              
                    <div className='repeatPassword'>
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input type='password' name='repeatPassword' onChange={this.handleChange}/>
                        {errors.repeatPassword.length > 0 && errors.password !== errors.repeatPassword && <span style={{color: 'red'}}>{errors.repeatPassword}</span>}
                    </div>              
                    <div className='submit'>
                        <button>Register Me</button>
                    </div>
                {this.state.success? <span className='success-message'>Account created! Check email to complete sign up</span>:<></>}

             </form>
         </div>
      </div>
     );
    }
}