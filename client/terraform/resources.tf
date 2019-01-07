locals {
  s3_origin_id = "cloudfront-distribution-origin-${var.domain}.s3.amazonaws.com/"
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static_website.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.static_website.arn}"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }
  }
}

resource "aws_s3_bucket" "static_website" {
  provider = "aws"
  acl      = "public-read"
  bucket   = "${var.subdomain}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "s3_policy" {
  bucket = "${aws_s3_bucket.static_website.id}"
  policy = "${data.aws_iam_policy_document.s3_policy.json}"
}

resource "aws_route53_zone" "route53_zone" {
  provider = "aws"
  name     = "${var.domain}"
}

resource "aws_route53_record" "website_route53_record" {
  provider = "aws"
  zone_id  = "${aws_route53_zone.route53_zone.zone_id}"
  name     = "${var.subdomain}"
  type     = "A"

  alias {
    name                   = "${aws_s3_bucket.static_website.website_domain}"
    zone_id                = "${aws_s3_bucket.static_website.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {}

resource "aws_cloudfront_distribution" "cdn" {
  provider   = "aws"
  depends_on = ["aws_s3_bucket.static_website"]

  origin {
    domain_name = "${aws_s3_bucket.static_website.website_endpoint}"
    origin_id   = "${var.domain}"

    s3_origin_config = {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"
    }
  }

  enabled             = true
  default_root_object = "index.html"
  aliases             = ["${var.subdomain}"]
  price_class         = "PriceClass_200"
  retain_on_delete    = true

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.s3_origin_id}"

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US"]
    }
  }
}

resource "aws_route53_record" "route53_to_cdn" {
  provider = "aws"
  zone_id  = "${aws_route53_zone.route53_zone.zone_id}"
  name     = "${var.cdn_subdomain}"
  type     = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.cdn.domain_name}"
    zone_id                = "${var.cf_alias_zone_id}"
    evaluate_target_health = false
  }
}
