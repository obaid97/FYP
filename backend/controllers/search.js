exports.searchPosts = (req,res,next)=> {
    console.log("Params: ", req.params.searchText);
    res.send("Called successfully.");
}
