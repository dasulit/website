import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
// import { FormatDate, FormatNumber } from '../../components/utils/format'
import { SyncInfobox } from '../../components/common/infobox'
import TableDev from '../../components/common/table-dev'

const ContentPage = ({ data }) => {
  const tableData = React.useMemo(
    () => data.allCovidUsDaily.edges.map(({ node }) => node),
    [],
  )

  const tableColumns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'States Tracked',
        accessor: 'states',
      },
      {
        Header: 'New Tests',
        accessor: 'totalTestResultsIncrease',
      },
      {
        Header: 'Positive',
        accessor: 'positive',
      },
      {
        Header: 'Negative',
        accessor: 'negative',
      },
      // {
      //   Header: 'Pos + Neg',
      //   accessor: TODO
      // },
      {
        Header: 'Pending',
        accessor: 'pending',
      },
      {
        Header: 'Deaths',
        accessor: 'deaths',
      },
      {
        Header: 'Total Tests',
        accessor: 'totalTestResults',
      },
    ],
    [],
  )

  return (
    <Layout
      title="US Historical Data"
      navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
    >
      <div
        className="module-content"
        dangerouslySetInnerHTML={{
          __html:
            data.allContentfulSnippet.edges[0].node
              .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
        }}
      />

      <SyncInfobox />

      <TableDev data={tableData} columns={tableColumns} />
    </Layout>
  )
}

export default ContentPage

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "us-daily" } }) {
      edges {
        node {
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allCovidUsDaily(sort: { order: DESC, fields: date }) {
      edges {
        node {
          totalTestResults
          totalTestResultsIncrease
          states
          positive
          pending
          negative
          hospitalized
          death
          date
        }
      }
    }
    allContentfulNavigationGroup(filter: { slug: { eq: "data" } }) {
      edges {
        node {
          pages {
            ... on ContentfulPage {
              title
              link: slug
            }
            ... on ContentfulNavigationLink {
              title
              link: url
            }
          }
        }
      }
    }
  }
`
