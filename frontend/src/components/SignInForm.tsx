import React from "react";
import "./style.css"

const emailRegex = RegExp(/^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i);

interface SignInProps {
    name?: any;
    value?: any;
}

interface SignInState {
    email : string,
    password : string
    errors : string
}

export class SignIn extends React.Component<SignInProps, SignInState>{
    constructor(props: SignInProps) {
        super(props)
        const initialState = {
            email : '',
            password : '',
            errors : ''
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange = (event: any) => {
        event.preventDefault()
        const { name, value } = event.target;
        let errors = this.state.errors;
        // switch( name ) {
        //     case 'email':
        //         errors.email = emailRegex.test(value)? '': 'Email is not valid!';
        //         break
        //     case 'password':
        //         errors.password = value.length < 8 ? 'Password must be eight characters long!': '';
        //         break
        //     default:
        //         break
        // }
        this.setState(Object.assign(this.state, {errors, [name]: value}))
        console.log(this.state)
    }
    handleSubmit = (event:any) => {
        event.preventDefault();
        let errors = this.state.errors;

        if (!this.state.email || !this.state.password) {
           
            this.setState({
                errors: 'Missing Username and/or Password'
            })

            // this.state.errors.credentials = 'Missing Username and/or Password'
        }
        console.log(this.state);
        

    }

    render() {
        const { errors } = this.state
        return (
          <div className='wrapper'>
            <div className='form-wrapper'>
               <h2>Sign In</h2>
               <form onSubmit={this.handleSubmit} noValidate >
                  <div className='email'>
                     <label htmlFor="email">Email</label>
                     <input type='email' name='email' onChange={this.handleChange}/>
                  </div>
                  <div className='password'>
                     <label htmlFor="password">Password</label>
                     <input type='password' name='password' onChange={this.handleChange}/>
                  </div>              
                  <div className='submit'>
                     <button>Register Me</button>
                     {errors.length > 0 && <span style={{color: "red"}}>{errors}</span>}
                  </div>
                  <div className='needAccount'>
                    <p>Need an account? <br/></p>
                    <span>
                        <a href="#">Sign Up</a>
                    </span>
                  </div>              
             </form>
         </div>
      </div>
     );
    }
}