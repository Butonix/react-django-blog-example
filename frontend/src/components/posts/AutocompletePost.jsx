import React from "react";
import { Link } from "react-router-dom";
import Downshift from "downshift";

import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";

const styles = {
  card: {
    maxWidth: "95%",
    marginBottom: "1em"
  },
  media: {
    height: 200,
    "&:hover": {
      opacity: 0.6,
      transition: ".5s ease",
      backfaceVisibility: "hidden",
      cursor: "pointer"
    }
  },
  textField: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2em",
    marginTop: "3em",
    width: "60%"
  }
};

class PostAutocomplete extends React.Component {
  componentDidMount() {
    this.props.filterPosts();
  }

  render() {
    const { posts } = this.props.posts_filtered;
    const { classes } = this.props;
    return (
      <Downshift
        onChange={selection => {
          console.log(`You selected ${selection.title}`);
        }}
        itemToString={i => (i == null ? "" : String(i.title))}
        onOuterClick={() => this.setState({ menuIsOpen: false })}
        render={({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div className="container text-center" style={{ marginTop: "2em" }}>
            <Paper elevation={5} style={{ padding: "2em" }}>
              <h3>Browse the blog for posts</h3>
              <h5 className="mt-4">
                based on programming language, title, or publication date
                (mm-dd, i.e. 01-25)
              </h5>
              <TextField
                {...getInputProps()}
                placeholder="Enter your query"
                label="Filter for posts"
                className={classes.textField}
                autoFocus={true}
              />
            </Paper>
            {isOpen ? (
              <div className="container">
                <div className="row justify-content-md-center">
                  {posts
                    .filter(
                      i =>
                        !inputValue ||
                        i.category
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) ||
                        i.title
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) ||
                        i.posted_on.includes(inputValue)
                    )
                    .slice(0, 10)
                    .map((item, index) => (
                      <div
                        {...getItemProps({
                          key: item.id,
                          index,
                          item
                        })}
                        className="col-lg-6"
                      >
                        {" "}
                        <Card className={classes.card}>
                          <Link to={`/${item.slug}`}>
                            <CardMedia
                              className={classes.media}
                              image={item.image_home_page}
                              title={item.title}
                            />
                          </Link>
                          <CardContent>
                            <Typography type="headline" component="h2">
                              <Link to={`/${item.slug}`}>{item.title}</Link>
                            </Typography>
                            <Typography component="p">
                              {`${item.content_home_page.substring(0, 250)}...`}
                            </Typography>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      />
    );
  }
}

export default withStyles(styles)(PostAutocomplete);
