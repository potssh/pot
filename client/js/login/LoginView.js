import Store from './LoginStore'
import Modal from '../ModalView';
var Redirect = ReactRouterDOM.Redirect;
export default class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            errorMsg: "",
            redirectToReferrer: false
        };
        this.store = new Store(this);

    }

    componentDidMount() {
        $(".downloadcss").hide();
        var localUserName = localStorage.getItem("localUserName");
        if(localUserName){
            this.refs.rname.checked = true;
            this.refs.name.value = localUserName;
        }

        var localUserPass = localStorage.getItem("localUserPass");
        if(localUserPass){
            this.refs.rpass.checked = true;
            this.refs.pass.value = localUserPass;
        }
        
    }

    openModalAddUser() {
        $("#userModal").css("top", "200px")
        $("#userModal").modal("show");
    }

    login(e) {
        e.preventDefault();
        let name = this.refs.name.value;
        let pass = this.refs.pass.value;
        if(this.refs.rname.checked == true){
            localStorage.setItem("localUserName" , name);
        }else{
            localStorage.setItem("localUserName" , "");
        }
        if(this.refs.rpass.checked == true){
            localStorage.setItem("localUserPass" , pass);
        }else{
            localStorage.setItem("localUserPass" , "");
        }
        this.store.login(name, pass);
    }

    addUser() {
        let name = this.refs.user.value;
        let newpwd = this.refs.newpwd.value;
        let renpwd = this.refs.renpwd.value;
        this.store.addUser(name, newpwd, renpwd);
        $("#userModal").modal("hide");
        this.refs.user.value = "";
        this.refs.newpwd.value = "";
        this.refs.renpwd.value = "";
    }

    render() {
        if (this.state.redirectToReferrer) {
            $(".downloadcss").show();
            return (
                <Redirect to={'/Home'} />
            )
        }

        var errorMsg;
        if (this.state.errorMsg != "") {
            errorMsg = (
                <div className="alert alert-warning">{this.state.errorMsg}</div>
            );
        }

        return (
            <div className="container" style={{ "padding-top": "130px","height":"100%" }}>
                <div className="col-md-offset-3 col-lg-offset-3 col-md-6 col-lg-6">
                    <div className="panel panel-default">
                        <div style={{ padding: "20px" }}>
                            <form onSubmit={this.login}>
                                <div className="text-center">
                                    <h1 className="page-header"><span className="fa fa-lock span-padding"></span>????????????</h1>
                                </div>
                                <div className="form-group">
                                    <input type="text" ref='name' className="form-control" placeholder="??????????????????" />
                                </div>
                                <div className="form-group">
                                    <input type="password" ref='pass' className="form-control" placeholder="???????????????" />
                                </div>
                                <div className="form-group">
                                    <label className="span-padding span-padding-right check-font-color">
                                        <input type="checkbox" ref='rname' /> ???????????????
                                    </label>
                                    <label className="span-padding check-font-color">
                                        <input type="checkbox" ref='rpass' /> ????????????
                                    </label>
                                </div>
                                <div className="form-group">
                                    <span className="span-padding span-padding-right span-padding-left"><input type="submit" className="btn btn-default" value="????????????" /></span>
                                    <span className="span-padding span-padding-left"><input type="button" className="btn btn-default" onClick={this.openModalAddUser.bind(this)} value="????????????" /></span>
                                </div>
                                {errorMsg}
                            </form>
                        </div>
                    </div>
                </div>
                <Modal id="userModal" title="????????????" icon="fa fa-key" saveButton={this.addUser.bind(this)}>
                    <div style={{ "padding": "30px 50px 10px 50px" }}>
                        <div className="form-group">
                            <input type="text" ref='user' className="form-control" placeholder="??????????????????" />
                        </div>
                        <div className="form-group">
                            <input type="password" ref='newpwd' className="form-control" placeholder="???????????????" />
                        </div>
                        <div className="form-group">
                            <input type="password" ref='renpwd' className="form-control" placeholder="???????????????" />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
};
LoginView.contextTypes = {
    router: React.PropTypes.object
}
