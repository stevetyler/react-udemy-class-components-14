import { Fragment, Component } from "react";
import classes from "./UserFinder.module.css";
import Users from "./Users";
import UsersContext from "../store/users-context";

 
class UserFinder extends Component {
    static contextType = UsersContext; // can only define once

    constructor() {
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: ""
        }
    }

    componentDidMount() {
        // http request...
        this.setState({
            filteredUsers: this.context.users
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState((curState) => {
                return {
                    ...curState, 
                    filteredUsers: this.context.users.filter((user) => {
                        return user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
                    })
                }
            })
        }
    }

    searchChangeHandler(event) {
        this.setState((curState) => {
            return {
                ...curState,
                searchTerm: event.target.value
            }
          });
    };

    render() {
        return (
            <Fragment>
                <div className={classes.finder}>
                    <input type="search" onChange={this.state.searchChangeHandler} />
                </div>
                <Users users={this.state.filteredUsers} />
            </Fragment>
          );
    }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");
 
//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => {
//         return user.name.toLowerCase().includes(searchTerm.toLowerCase());
//       })
//     );
//     //
//   }, [searchTerm]);
 
//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };
 
//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
//};
 
export default UserFinder;