import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { ArrowLink, Heading, icons, theme } from "@socialgouv/react-ui";
import { getLabelBySource, getRouteBySource, SOURCES } from "@cdt/sources";

import { CustomTile } from "./tiles/Custom";

export const RelatedItems = ({ items = [] }) => {
  const { relatedTools, relatedLetters, relatedArticles } = items.reduce(
    (accumulator, item) => {
      const itemSource = item.source;
      if (itemSource === SOURCES.TOOLS) {
        accumulator.relatedTools.push(item);
      } else if (itemSource === SOURCES.LETTERS) {
        accumulator.relatedLetters.push(item);
      } else {
        accumulator.relatedArticles.push(item);
      }
      return accumulator;
    },
    {
      relatedTools: [],
      relatedLetters: [],
      relatedArticles: []
    }
  );
  return (
    <StyledList>
      {relatedLetters.length > 0 && (
        <StyledListItem>
          <Link
            href={`/${getRouteBySource(relatedLetters[0].source)}/[slug]`}
            as={`/${getRouteBySource(relatedLetters[0].source)}/${
              relatedLetters[0].slug
            }`}
            passHref
          >
            <CustomTile
              action="Consulter"
              icon={icons.Document}
              title={relatedLetters[0].title}
              subtitle={getLabelBySource(relatedLetters[0].source)}
            />
          </Link>
        </StyledListItem>
      )}
      {relatedTools.length > 0 && (
        <StyledListItem>
          <Link
            href={`/${getRouteBySource(relatedTools[0].source)}/[slug]`}
            as={`/${getRouteBySource(relatedTools[0].source)}/${
              relatedTools[0].slug
            }`}
            passHref
          >
            <CustomTile
              action={relatedTools[0].action}
              icon={icons[relatedTools[0].icon]}
              title={relatedTools[0].title}
              subtitle={getLabelBySource(relatedTools[0].source)}
            >
              {relatedTools[0].description}
            </CustomTile>
          </Link>
        </StyledListItem>
      )}
      {relatedArticles.length > 0 && (
        <Heading>Les articles pouvant vous intéresser&nbsp;:</Heading>
      )}
      {relatedArticles.slice(0, 3).map(({ slug, source, title }) => (
        <StyledListItem key={slug}>
          <Link
            href={`/${getRouteBySource(source)}/[slug]`}
            as={`/${getRouteBySource(source)}/${slug}`}
            passHref
          >
            <ArrowLink arrowPosition="left">{title}</ArrowLink>
          </Link>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

const { breakpoints, spacings } = theme;

const StyledList = styled.ul`
  position: sticky;
  top: 12rem;
  width: 30%;
  margin: 0;
  padding: 0 ${spacings.base} 0 0;
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
  list-style-type: none;
`;

const StyledListItem = styled.li`
  margin: ${spacings.base} 0;
  padding: 0;
`;