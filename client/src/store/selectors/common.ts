import { match } from 'react-router-dom';

export interface RelationIdRouteProps {
  match: match<{ relationId: string }>;
}

export const extractRelationId = ({
  match: {
    params: { relationId }
  }
}: RelationIdRouteProps) => parseInt(relationId, 10);
