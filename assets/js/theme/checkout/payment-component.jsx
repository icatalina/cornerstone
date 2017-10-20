import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Radio from 'material-ui/Radio';
import Typography from 'material-ui/Typography';

export default class PaymentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMethodId: null,
        };
    }

    render() {
        return (
            <form onSubmit={ (...args) => this._handleSubmit(...args) } noValidate>
                <Typography type="display1" gutterBottom>
                    Payment
                </Typography>

                <List>
                    { this.props.methods.map(method => (
                        <ListItem
                            key={ method.id }
                            onClick={ () => this._handleMethodSelect(method.id) }
                            button>
                            <Radio
                                checked={ this.state.selectedMethodId === method.id }
                                disableRipple
                            />
                            <ListItemText primary={ method.config.displayName } />
                        </ListItem>
                    )) }
                </List>

                <Button type="submit">
                    Submit
                </Button>
            </form>
        );
    }

    _handleMethodSelect(methodId) {
        this.setState({
            selectedMethodId: methodId,
        });
    }

    _handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.state.selectedMethodId);
    }
}
