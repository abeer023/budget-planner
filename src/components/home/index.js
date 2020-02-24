import React, { Component } from "react";
import Layout from "../shared/Layout";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import { fetchBudgets, createBudget, editBudget } from '../../actions/budgetActions';
import { fetchTransactions, createTransaction, deleteTransaction } from '../../actions/transactionActions';

const classes = {
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
    },
    backButton: {
        marginTop: 10
    },
    createButton: {
        float: 'right!important',
        marginBottom: 3
    },
    header: {
        marginBottom: 20,
        backgroundColor: '#F0F3F5'
    }
};

function getCurrentMonth() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var now = new Date();
    var thisMonth = months[now.getMonth()];
    return thisMonth;
}

const BudgetCard = props => {
    return (
        <div>
            <Card style={classes.root}>
                <b>Your Monthly Budget</b>
                {props.data.length ? props.data.map(row => {
                    return (
                        <React.Fragment>
                            <Typography>{row.month} {row.year} Budget: AED {row.amount}
                                <Button color="primary" variant="contained" onClick={() => props.edit(row)} spacing={3} style={{ flex: 1, float: 'right' }}>Edit</Button>
                            </Typography>
                            Balance: AED {props.balance}
                        </React.Fragment>);
                }) : <Button color="primary" variant="contained" onClick={() => props.add()} style={{ flex: 1, float: 'right' }} spacing={3} >Add</Button>}
            </Card>
        </div>
    );
};

const TransactionCard = props => {
    return (
        <Paper style={classes.root}>
            <Table style={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell numeric>Amount</TableCell>
                        <TableCell>
                            Actions
                            <Button variant="contained" color="primary" aria-label="Create" size="small" onClick={() => props.add()} style={{ float: 'right' }}>
                                Create
                            </Button >
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.length ? props.data.filter(item => (!!item._id)).map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.description}</TableCell>
                                <TableCell >{row.category}</TableCell>
                                <TableCell numeric>{row.amount}</TableCell>
                                <TableCell>
                                    <IconButton variant="contained" color="primary" aria-label="Delete" size="small" onClick={() => props.delete(row._id)}>
                                        <DeleteIcon />
                                    </IconButton >
                                </TableCell>
                            </TableRow>
                        );
                    }) : <TableRow>None</TableRow>}
                </TableBody>
            </Table>
        </Paper>
    )
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openTransaction: false,
            month: getCurrentMonth(),
            year: 2020,
            Id: 0,
            _id: '',
            amount: 0,
            description: '',
            category: ''
        }
    }

    componentWillMount() {
        this.props.fetchBudgets();
        this.props.fetchTransactions();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newBudget) {
            this.props.budgets.push(nextProps.newBudget);
        }
        if (nextProps.newTransaction) {
            this.props.transactions.push(nextProps.newTransaction);
        }
    }

    updateVal = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClickOpenTransaction = () => {
        this.setState({ openTransaction: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            month: getCurrentMonth(),
            year: 2020,
            Id: 0,
            _id: '',
            amount: 0
        });
    };

    handleCloseTransaction = () => {
        this.setState({
            openTransaction: false,
            description: '',
            category: '',
            Id: 0,
            _id: '',
            amount: 0
        });
    };

    edit = (budget) => {
        this.setState({
            open: true,
            month: budget.month,
            year: budget.year,
            Id: budget.Id,
            _id: budget._id,
            amount: budget.amount
        });
    }

    deleteTransaction = (id) => {
        this.props.deleteTransaction(id)
    }

    handleSave = (e) => {
        e.preventDefault();
        if (!this.state._id) {
            const budget = {
                Id: this.props.budgets.length + 1,
                _id: this.state._id,
                month: this.state.month,
                year: this.state.year,
                amount: this.state.amount,
                userId: this.props.user._id
            };
            this.props.createBudget(budget);
        }
        else {
            const budget = {
                _id: this.state._id,
                Id: this.state.Id,
                month: this.state.month,
                year: this.state.year,
                amount: this.state.amount,
                userId: this.props.user._id

            };
            this.props.editBudget(budget);
        }
        this.setState({
            openTransaction: false,
            description: '',
            category: '',
            Id: 0,
            _id: '',
            amount: 0
        });
    }

    handleSaveTransaction = (e) => {
        e.preventDefault();
        const transaction = {
            Id: this.props.transactions.length + 1,
            _id: this.state._id,
            description: this.state.description,
            category: this.state.category,
            amount: this.state.amount,
            userId: this.props.user._id,
            month: this.state.month,
            year: this.state.year
        };
        this.props.createTransaction(transaction);
        this.setState({
            openTransaction: false,
            month: getCurrentMonth(),
            year: 2020,
            Id: 0,
            _id: '',
            amount: 0
        });
    }

    render() {
        let { budgets, user, transactions } = this.props
        let currentBudgetByUser = budgets.filter(item => (item.month === getCurrentMonth() && item.year === (new Date()).getFullYear() && item.userId === user._id));
        let currentTransactionByUser = transactions.filter(item => (item.month === getCurrentMonth() && item.year === (new Date()).getFullYear() && item.userId === user._id))
        let total = currentTransactionByUser.reduce(function (prev, cur) {
            return prev + cur.amount;
        }, 0);
        let balance = currentBudgetByUser.length ? (currentBudgetByUser[0].amount - total) : 0;
        return (
            <Layout>
                <BudgetCard data={currentBudgetByUser} edit={this.edit} add={this.handleClickOpen} balance={balance} />
                <TransactionCard data={currentTransactionByUser} delete={this.deleteTransaction} add={this.handleClickOpenTransaction} />
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">{this.state._id ? "Update" : "Create"} Budget</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" name="month" label="month" type="text" fullWidth onChange={this.updateVal} value={this.state.month} />
                        <TextField margin="dense" name="year" label="year" type="number" fullWidth onChange={this.updateVal} value={this.state.year} />
                        <TextField margin="dense" name="amount" label="amount" type="number" fullWidth onChange={this.updateVal} value={this.state.amount} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.handleSave} color="primary">{this.state._id ? "Update" : "Create"}</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.openTransaction} onClose={this.handleCloseTransaction} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" name="description" label="description" type="text" fullWidth onChange={this.updateVal} value={this.state.description} />
                        <TextField margin="dense" name="category" label="category" type="text" fullWidth onChange={this.updateVal} value={this.state.category} />
                        <TextField margin="dense" name="amount" label="amount" type="number" fullWidth onChange={this.updateVal} value={this.state.amount} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseTransaction} color="primary">Cancel</Button>
                        <Button onClick={this.handleSaveTransaction} color="primary">Create</Button>
                    </DialogActions>
                </Dialog>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    budgets: state.budgets.items,
    newBudget: state.budgets.item,
    transactions: state.transactions.items,
    newTransaction: state.transactions.item,
    user: state.auth.user
});

export default connect(mapStateToProps, { fetchBudgets, createBudget, editBudget, fetchTransactions, createTransaction, deleteTransaction })(withRouter(Home));
