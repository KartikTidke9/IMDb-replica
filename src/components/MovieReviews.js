import { ImageList, ImageListItem, Avatar, Divider } from "@mui/material";

function MovieReviewsList({ reviews, baseUrl }) {
  //mapping over reviews array
  const renderedComments = reviews.map((review) => {
    const created_at = new Date(review.created_at).toDateString();
    const updated_at = new Date(review.updated_at).toDateString();

    return (
      <div key={review.id}>
        <ImageListItem sx={{ margin: "1rem 0" }}>
          {/* person info */}
          <a
            href={review.url}
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none", color: "rgb(221,221,221)" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div>
                <Avatar
                  sx={{ width: "3rem", height: "3rem" }}
                  src={baseUrl + review.author_details?.avatar_path}
                  alt={review.author + "avatar"}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <h4>{review.author_details?.username || "anonymous"}</h4>
                <span style={{ color: "#ffc107" }}>
                  {review.author_details?.name || "anonymous"}
                </span>
                <span>posted: {created_at}</span>
              </div>
            </div>
          </a>

          {/* comments */}
          <div style={{ margin: "0.5rem 0 0 0" }}>
            <div style={{ color: "#ffc10770" }} >Updated at: {updated_at}</div>
            {review.content}
          </div>
        </ImageListItem>
        <Divider
          orientation="horizontal"
          style={{ backgroundColor: "gray", height: "0.05rem" }}
        />
      </div>
    );
  });

  return (
    <>
      <h1 style={{ color: "#ffc107", margin: "0 0 1rem 0" }}>Reviews</h1>
      <ImageList cols={1}>{renderedComments}</ImageList>
    </>
  );
}

export default MovieReviewsList;
